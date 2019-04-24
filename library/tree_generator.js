
var _ = require('lodash');
var data_set_splitter = require('./data_set_splitter')
var best_feature_selector = require('./best_feature_selector')
var shannon_entropy = require('./shannon_entropy')

/**
 * This method will generate a decision tree
 * @method generate_decision_tree
 * @param  {Array of object}               data The dataset
 * @return {Object}                    The decision tree/ ex : {"has_a_car":{"yes":{"has_a_house":{"yes":"good_borrower","no":"bad_borrower"}},"no":"bad_borrower"}}
 */
var generate_decision_tree = function(data){

  // Because we build a recursive function
  // we have to set our stopping conditions at the
  // top.

  // group the dataset by label
  var grouped_data_per_label = _.groupBy(data, function(o){
    return o.label
  });

  // We stop when there are only elements of the same class
  // inside the dataset
  //
  if(_.size(grouped_data_per_label)===1){
    return Object.keys(grouped_data_per_label)[0]
  }



  //  If there is no more features to split
  //  The size of the first training is only 1 because
  //  there is just one property the class
  //  ex : data[0] = {"label":"good_borrower"}
  if(_.size(data[0])===1){
    return mostly_present_class(data)
  }




  // Get the best feature to split
  var best_feature_for_splitting = best_feature_selector.get_the_best_feature_for_splitting(data)

  // create the object decision tree
  var decision_tree ={}
  decision_tree[best_feature_for_splitting]={}

  // we have then to extract the unique values of this feature in the dataset
  // get unique values of this feature
  var unique_values_of_best_feature =  _.uniq(_.map(data, best_feature_for_splitting));
  // forEach unique values of this feature
  _.map(unique_values_of_best_feature, function(value_of_this_feature) {


    // We get the dataset cleaned of examples that have a feature "best_feature_for_splitting"
    // set to the value : "value_of_this_feature"
    var new_data_set = data_set_splitter.split_the_dataset_by_feature_and_value(data,best_feature_for_splitting,value_of_this_feature)
    decision_tree[best_feature_for_splitting][value_of_this_feature] = generate_decision_tree(new_data_set);

  });


  return decision_tree

}


module.exports={
  generate_decision_tree : generate_decision_tree
}